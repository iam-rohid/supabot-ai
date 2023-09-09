import Background from "@/components/Background";
import PricingFAQ from "@/components/pages/pricing/PricingFAQ";
import PricingPlans from "@/components/pages/pricing/PricingPlans";
import MarketingLayout from "@/layouts/MarketingLayout";
import { NextPageWithLayout } from "@/types/next";
import { APP_NAME } from "@/utils/constants";
import Head from "next/head";

const PricingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{`Pricing - ${APP_NAME}`}</title>
      </Head>

      <Background />

      <main className="space-y-48 py-32">
        <PricingPlans />
        <PricingFAQ />
      </main>
    </>
  );
};

PricingPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default PricingPage;
