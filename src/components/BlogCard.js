import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { serverApi } from "../lib/config.ts";

export default function BlogCard(props) {
  const { article } = props;

  const art_image = article?.art_image
    ? `${serverApi}/${article?.art_image}`
    : "https://u.today/sites/default/files/styles/1600x900/public/2023-07/e0147.jpg";
  return (
    <Card variant="outlined" sx={{ width: 320, m: "10px" }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={art_image} srcSet={art_image} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{article.art_subject}</Typography>
        <Typography level="body-sm">{article.account_id}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            {new Date(article.createdAt).toDateString()}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
