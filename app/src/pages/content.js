import React from "react";
import Meta from "components/Meta";
import ContentCardsSection from "components/ContentCardsSection";

function ContentPage(props) {
  return (
    <>
      <Meta title="Content" />
      <ContentCardsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Featured Content"
        subtitle=""
      />
    </>
  );
}

export default ContentPage;
