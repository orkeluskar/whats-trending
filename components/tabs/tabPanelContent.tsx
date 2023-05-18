import { Badge, Card, Divider, Link, List, ListItem, Typography } from "@mui/joy";
import { definitions } from "../../types/client";

type TabPanelContentProps = {
    posts: any[],
    title: string,
    getURL: (post: any) => string,
    getName: (name: string) => string
}

export default function TabPanelContent({ posts, title, getURL, getName }: TabPanelContentProps) {
    return (
        <>
            <Typography level="h5" textAlign={'center'} alignItems='center'>{title}</Typography>
            <Divider sx={{ margin: 1 }} />
            <List aria-labelledby="basic-list-demo">
                {posts.map((post: any) => (
                    <ListItem key={post.id}>
                        <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                            <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw' }}>
                                <Card row>
                                    <Typography>{getName(post.name)}</Typography>
                                </Card>
                            </Badge>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}
