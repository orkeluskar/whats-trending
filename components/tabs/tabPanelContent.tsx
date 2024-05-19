import {
  Badge,
  Card,
  CardContent,
  CardOverflow,
  Link,
  List,
  ListItem,
  Typography,
  Slider,
  Box,
} from "@mui/joy";
import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

type TabPanelContentProps = {
  posts: any[];
  title: string;
  getURL: (post: any) => string;
  getName: (name: string) => string;
};

export default function TabPanelContent({
  posts,
  title,
  getURL,
  getName,
}: TabPanelContentProps) {
  const isDesktop = useMediaQuery("(min-width:500px)");
  const types = new Set(posts?.map((p) => p?.type));
  const hasMultipleTypes = types.size > 1;

  const getMarks = () => {
    const _marks: { value: any; label: string }[] = [];
    let index = 0;
    if (!hasMultipleTypes) return _marks;
    types.forEach((type: string) => {
      _marks.push({
        value: index,
        label: type,
      });
      index += 1;
    });
    return _marks;
  };

  const marks = getMarks();
  const [currType, setCurrType] = useState(
    hasMultipleTypes ? marks[0].label : null
  );

  const handleChange = (_e: any, value: number | number[]) => {
    // @ts-ignore
    setCurrType(marks[value].label);
  };

  return (
    <>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Typography level="h5" textAlign={"center"} alignItems="center">
          {title}
        </Typography>
        {hasMultipleTypes && (
          <Slider
            defaultValue={0}
            max={1}
            marks={marks}
            sx={{ width: 100 }}
            onChangeCommitted={handleChange}
          />
        )}
      </Box>

      <List aria-labelledby="basic-list-demo">
        {posts?.map((post: any) => (
          <ListItem
            key={post.id}
            sx={{ display: currType === post.type ? "inherit" : "none" }}
          >
            <Link target="_blank" rel="noreferrer" href={getURL(post)}>
              <Badge
                badgeContent={post.volume}
                sx={{ border: 1, borderRadius: "10px", maxWidth: "70vw" }}
              >
                <Card
                  row
                  variant="outlined"
                  sx={{ minWidth: isDesktop ? 350 : "75vw" }}
                >
                  {post?.media_url && (
                    <CardOverflow
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AspectRatio
                        ratio="9 / 16"
                        sx={{ width: isDesktop ? 90 : 56.25 }}
                      >
                        <Image
                          height={isDesktop ? 160 : 100}
                          width={isDesktop ? 90 : 56.25}
                          src={post.media_url}
                          alt={`Image related to ${getName(post.name)}`}
                          loading="lazy"
                        />
                      </AspectRatio>
                    </CardOverflow>
                  )}
                  <CardContent sx={{ px: 2 }}>
                    <Typography
                      fontWeight="md"
                      textColor="success.plainColor"
                      mb={0.5}
                    >
                      {getName(post.name)}
                    </Typography>
                  </CardContent>
                </Card>
              </Badge>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}
