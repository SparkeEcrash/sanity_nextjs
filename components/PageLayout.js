import { Container } from "react-bootstrap";
import Head from "next/head";
import Navbar from "./Navbar";
// import { useTheme } from "providers/ThemeProvider";

export default function PageLayout({ children, className }) {
  // const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Sontradr Sanity Demo</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: myriad-pro;
          src: url(https://use.typekit.net/af/1b1b1e/00000000000000000001709e/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3)
              format("woff2"),
            url(https://use.typekit.net/af/1b1b1e/00000000000000000001709e/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3)
              format("woff"),
            url(https://use.typekit.net/af/1b1b1e/00000000000000000001709e/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3)
              format("opentype");
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: myriad-pro;
          src: url(https://use.typekit.net/af/c630c3/000000000000000000017098/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3)
              format("woff2"),
            url(https://use.typekit.net/af/c630c3/000000000000000000017098/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3)
              format("woff"),
            url(https://use.typekit.net/af/c630c3/000000000000000000017098/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3)
              format("opentype");
          font-weight: 300;
          font-style: normal;
        }
        @font-face {
          font-family: myriad-pro;
          src: url(https://use.typekit.net/af/cafa63/00000000000000000001709a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("woff2"),
            url(https://use.typekit.net/af/cafa63/00000000000000000001709a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("woff"),
            url(https://use.typekit.net/af/cafa63/00000000000000000001709a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("opentype");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: myriad-pro;
          src: url(https://use.typekit.net/af/80c5d0/00000000000000000001709c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3)
              format("woff2"),
            url(https://use.typekit.net/af/80c5d0/00000000000000000001709c/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3)
              format("woff"),
            url(https://use.typekit.net/af/80c5d0/00000000000000000001709c/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3)
              format("opentype");
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: bebas-neue;
          src: url(https://use.typekit.net/af/2f0e6a/00000000000000003b9b12e6/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("woff2"),
            url(https://use.typekit.net/af/2f0e6a/00000000000000003b9b12e6/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("woff"),
            url(https://use.typekit.net/af/2f0e6a/00000000000000003b9b12e6/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)
              format("opentype");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: myriad-pro-light;
          src: url("/css/font/MyriadPro-Light.otf") format("opentype");
        }
      `}</style>
      <Container>
        <Navbar />
        <div className={`page-wrapper ${className}`}>{children}</div>
        <footer className="page-footer">
          {/* <div>
            <a href="#">courses</a>
            {" | "}
            <a href="#">github</a>
            {" | "}
            <a href="#">facebook</a>
            {" | "}
          </div> */}
        </footer>
      </Container>
    </div>
  );
}
