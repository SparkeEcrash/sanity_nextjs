
import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import { Col } from "react-bootstrap";
import CardItem from "components/CardItem";
import CardItemBlank from "components/CardItemBlank";
import CardListItem from "components/CardListItem";
import CardListItemBlank from "components/CardListItemBlank";
import moment from "moment";

const BlogList = ({ blogs, filter }) => {
  return blogs.map((blog) =>
    filter.view.list ? (
      <Col key={blog["what we want for api"]} md="9">
        <CardListItem
          author={blog.author}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
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
          date={moment(blog.date).format("LL")}
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
};

export const useGetBlogsPages = ({ blogs, filter }) => {

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: paginatedBlogs, error } = withSWR(
        useGetBlogs({ offset, filter })
			);
			
			if (!offset && !paginatedBlogs && !error) {
				return <BlogList blogs={blogs} filter={filter}/>
			}

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

      return <BlogList blogs={paginatedBlogs} filter={filter} />
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