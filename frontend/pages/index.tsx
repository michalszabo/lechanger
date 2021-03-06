import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { GiReceiveMoney } from "@react-icons/all-files/gi/GiReceiveMoney";
import { IoMdStats } from "@react-icons/all-files/io/IoMdStats";

import type { NextPage, GetServerSideProps } from "next";
import type { CSSObject } from "@chakra-ui/react";
import type { ApiStatsDataType } from "@shared-types";
import type { AvailableCurrenciesType } from "@/types";

import { ExchangeForm, ExchangeStats } from "@/components";

const tabSelectedStyle: CSSObject = {
  color: "white",
  bg: "transparent"
};

interface PageProps {
  availableCurrencies: AvailableCurrenciesType;
  stats: ApiStatsDataType;
}

const Home: NextPage<PageProps> = ({ availableCurrencies, stats }) => (
  <Tabs
    isFitted
    variant="unstyled"
    size="lg"
    borderRadius="1.25rem"
    overflow="hidden"
    bg="purple.700"
  >
    <TabList>
      <Tab bg="purple.200" color="dark" _selected={tabSelectedStyle}>
        <GiReceiveMoney />
        <Box as="span" ml={2}>
          Convert
        </Box>
      </Tab>
      <Tab bg="purple.200" color="dark" _selected={tabSelectedStyle}>
        <IoMdStats />
        <Box as="span" ml={2}>
          Stats
        </Box>
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel pt={14} pb={10}>
        <ExchangeForm availableCurrencies={availableCurrencies} />
      </TabPanel>
      <TabPanel pt={14} pb={10}>
        <ExchangeStats data={stats} />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const availableCurrenciesJSON = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/currency/list`
  );
  const availableCurrencies = await availableCurrenciesJSON.json();

  const statsJSON = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
  const stats = await statsJSON.json();

  const shortAvailableCurrencies: string[] = Array.from(
    Object.keys(availableCurrencies.data)
  );

  const longAvailableCurrencies: string[] = Object.entries(
    availableCurrencies.data
  ).map(([key, value]) => `${key} - ${value}`);

  const props: PageProps = {
    availableCurrencies: {
      short: shortAvailableCurrencies,
      long: longAvailableCurrencies
    },
    stats: stats.data
  };

  return {
    props
  };
};

export default Home;
