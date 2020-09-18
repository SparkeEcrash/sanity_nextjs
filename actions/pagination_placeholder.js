
import { useEffect } from "react";
import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import { Col } from "react-bootstrap";
import CardItem from "components/CardItem";
import CardItemBlank from "components/CardItemBlank";
import CardListItem from "components/CardListItem";
import CardListItemBlank from "components/CardListItemBlank";
import moment from 'moment';

export const useGetBlogsPages = ({ blogs, filter }) => {
  useEffect(() => {
    window.__pagination__init = true;
  }, []);

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs;

      //this ensures that when the compnent re renders when [filter] changes... if the function is being ran by the client... it sets the initialData to null so that all the data can be re-fetched over again rather than resorting to cached one. This step is necessary for date sorting to wokr properly
      if (typeof window !== "undefined" && window.__pagination__init) {
        initialData = null;
      }

      const { data: paginatedBlogs } = withSWR(
        useGetBlogs({ offset, filter }, initialData)
      );

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((item, i) =>
            filter.view.list ? (
              <Col key={i} md="9">
                <CardListItemBlank />
              </Col>
            ) : (
              <Col key={`${i}-item`} md="6" lg="4">
								<CardItemBlank />
              </Col>
            )
          );
      }

      return paginatedBlogs.map((blog) =>
        filter.view.list ? (
          <Col key={blog["what we want for api"]} md="9">
            <CardListItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={moment(blog.date).format('LLLL')}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blog["what we want for api"]}`,
              }}
            />
          </Col>
        ) : (
          <Col key={blog["what we want for api"]} md="6" lg="4">
            <CardItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={moment(blog.date).format('LLLL')}
              image={blog.coverImage}
              slug={blog["what we want for api"]}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blog["what we want for api"]}`,
              }}
            />
          </Col>
        )
      );
    },
    //here you will compute offset that will get passed into previous callback function with 'withSWR'
    // SWR: data you will get from 'withSWR' function
    // index: number of current useGetBlogsPages
    (SWR, index) => {
      //all the data has been sent
      if (SWR.data && SWR.data.length === 0) {
        return null;
      }
      return (index + 1) * 6;
    },
    [filter]
  );
};