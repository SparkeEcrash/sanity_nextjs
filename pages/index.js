import { useState } from "react";
import { Row, Button } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import FilteringMenu from "components/FilteringMenu";
import PreviewAlert from 'components/PreviewAlert';

import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api";

export default function Home(props) {
  const [filter, setFilter] = useState({
		view: { list: 0 },
		date: { asc: 0 }
	});
	
	// loadMore: to load more data
	// isLoadingMore: is true whenever we are making request to fetch data
	// isReachingEnd: is true when we loaded all of the data, data is empty (empty array)

	let blogs = props.blogs;

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  /* CORS ISSUE ENCOUNTERED
	useEffect(() => {
		async function fetchBlogs() {
			const blogs = await getAllBlogs();
			return blogs;
		}

		fetchBlogs();
	}, [])
	*/

  return (
    <PageLayout>
			{ props.preview && <PreviewAlert /> }
      {/* <AuthorIntro /> */}
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <hr />
      {props.message}
      <Row className="mb-5">{pages}</Row>
			<div style={{textAlign: 'center'}}>
			{
				!isReachingEnd && (
					<div onClick={loadMore} disabled={isLoadingMore} className="load-more">
						{isLoadingMore ? '...' : 'More'}
					</div>
				)
			}
			</div>
    </PageLayout>
  );
}

// export async function getServerSideProps() {
//this will create dynamic page
//console log random number will always be different when refreshed

// This function is called during the build (build time)
// This gets called on the server
// Provides props to your page
// It will create static page
//console log random number will always be the same when refreshed
export async function getStaticProps({preview = false}) {
	//this will create a static apge
	const blogs = await getPaginatedBlogs({ offset: 0, date: 'desc' });

  return {
    props: {
      message: "",
			blogs,
			preview
		},
		revalidate: 1,
		//this makes it so that the server re-builds (npm run build) the pages when new data is added from the backend
  };
}

/*LESSON 15*/
// Static Page (next.js) **getStaticProps()**
// Faster, can be cached using CDN
// Created at build time
// When we making the request we are always receiving the same html document

// Dynamic Page (react.js) **getServerSideProps()**
// Created at request time (we can fetch data on server)
// Little bit slower, the time depends on data you are fetching
