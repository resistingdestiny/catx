import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />

          {/* Uncomment to add favicons for other platforms */}
          {/* These files can be generated with realfavicongenerator.net */}
          {/*
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/safari-pinned-tab.svg" rel="mask-icon" color="#4a9885" />
          <link href="/site.webmanifest" rel="manifest" />
          */}

          {/* Roboto Font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/* Inject MUI styles */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const serverEmotionCache = createCache({ key: "css", prepend: true });
  const { extractCriticalToChunks } = createEmotionServer(serverEmotionCache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App serverEmotionCache={serverEmotionCache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
