import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
import ErrorPage from "next/error";
import { getBlogBySlug, getPaginatedBlogs } from "lib/api";
import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";
import moment from "moment";
import { useRouter } from "next/router";

import BlogContent from "components/BlogContent";
import PreviewAlert from 'components/PreviewAlert';

const BlogDetail = ({ blog, preview, previewData }) => {
  /////////////////// IF fallback is set to true you need these below lines of code
	const router = useRouter();
	const message = previewData?.message;

  if (!router.isFallback && !blog?.["what we want for api"]) {
    //this is when a page is truly not found
    return <ErrorPage statusCode="500" />;
  }

  if (router.isFallback) {
    //this is when a page that was not initially built staticaly needs to get loaded
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }
  //////////////////

	{console.log(preview)}

  return (
    <PageLayout className="blog-detail-page">
			<div className="blog-panel">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
					{ preview && <PreviewAlert message={message}/>}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={moment(blog.date).format("LL")}
          />
          <hr />
          {/* Blog Content Here */}
          <BlogContent content={blog.content}></BlogContent>
        </Col>
      </Row>
			</div>
    </PageLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData = {message: null}}) {
	// Todo: pass preview to getBlogBySlug and fetch draft blog
	console.log('Preview is ', preview);
	console.log('previewData:', previewData);
	const blog = await getBlogBySlug(params.slug, preview);
		console.log(blog);

  return {
		props: { blog, preview, previewData },
		revalidate: 1,
		//this makes it so that the server re-builds (npm run build) the pages when new data is added from the backend
	};
}

// TODO: Introduce fallback
/*below function is needed to change getServerSideProps to getStaticProps in line 13 since html pages needed to be built with dynamic blogs*/
export async function getStaticPaths() {
  // you need to get all blogs so that you can build static pages for all blog pages so that when you reload the site on the blog page 404 error does not appear
  // with getPaginatedBlogs you will get 404 (you need to set fallback to true on line 66)
  // with getAllBlogs you will get the page (you can set fallback to false on line 66)
  const blogs = await getPaginatedBlogs();
  const paths = blogs?.map((b) => ({
    params: {
      slug: b["what we want for api"],
    },
  }));
  return {
    paths,
    fallback: true,
    /*fallback is to route when the slug is not found and therefore the url does not find a page*/
  };
}

export default BlogDetail;
