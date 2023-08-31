import MarketingLayout from "@/layouts/MarketingLayout";
import { NextPageWithLayout } from "@/types/next";
import { APP_NAME } from "@/utils/constants";
import Head from "next/head";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{`Welcome to ${APP_NAME}`}</title>
      </Head>
      <p>Home Page</p>
    </>
  );
};

HomePage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default HomePage;
