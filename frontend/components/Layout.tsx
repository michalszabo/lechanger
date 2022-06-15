import { Flex, Box, Heading } from "@chakra-ui/react";

import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    bg="dark"
    height="100%"
    maxW="1560px"
    mx="auto"
    py={5}
  >
    <Box as="header">
      <Heading
        as="h1"
        fontSize={{ base: "5xl", md: "6xl", xxl: "7xl" }}
        fontWeight="extrabold"
        lineHeight={1.5}
        bgGradient="linear(to-l, purple.600, pink.500)"
        backgroundClip="text"
        color="transparent"
      >
        l&apos;échanger
      </Heading>
    </Box>

    <Box
      as="main"
      flex="1"
      w="full"
      maxW="min(85vw, 800px)"
      mx="auto"
      py={{ base: 5, md: 7 }}
    >
      {children}
    </Box>

    <Box as="footer" color="white" w="full" textAlign="center">
      <a
        href="https://github.com/michalszabo/lechanger"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy;2022 Michal Szabo
      </a>
    </Box>
  </Flex>
);

export default Layout;
