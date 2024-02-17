import React, { Suspense } from "react";

const AskQuestionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-11">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </>
  );
};

export default AskQuestionLayout;
