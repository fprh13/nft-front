import { Box, Image, Link } from "@chakra-ui/react";

function Nft(props) {
  // You can now display the NFT metadata.
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt="1"
      fontWeight="semibold"
      as="h4"
      lineHeight="tight"
      noOfLines={1}
      height={"585px"}
      padding={"10px"}
    >
      <Image src={props.image} alt="" height={"350px"} />
      <Link
        href={"https://opensea.io/assets/" + props.address + "/" + props.id}
        target="_blank"
      >
        {props.title ? props.title : "#" + props.id} {"  "}{" "}
        {props.data.contractMetadata.tokenType}
      </Link>
      <div style={{ marginTop: "10px" }}>{props.data.description}</div>
    </Box>
  );
}

export default Nft;
