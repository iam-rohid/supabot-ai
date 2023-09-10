import DashboardPageHeader from "@/components/DashboardPageHeader";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/types/next";
import { APP_NAME } from "@/utils/constants";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{`Plan & Billing - ${APP_NAME}`}</title>
      </Head>

      <DashboardPageHeader title="Plan & Billing" />
      <div className="container mb-32 mt-8 md:mt-16"></div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
