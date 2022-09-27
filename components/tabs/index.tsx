import { 
    Tabs, TabList, Tab, ListItemDecorator, TabPanel,
    List, ListItem,
    Card,
    Badge,
    Typography,
    Link
} from '@mui/joy';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';

export type TrendTabsProps = {
    posts: any[]
}

export default function TrendTabs(props: TrendTabsProps) {
    const { posts } = props;

    const twitterPosts = posts.filter(p => p.source === 1)
    const googlePosts = posts.filter(p => p.source === 2)
    const youtubePosts = posts.filter(p => p.source === 3)

    const getURL = (post: any) => {
        const name = encodeURIComponent(post.name)
        switch(post.source) {
            case 1: return `https://twitter.com/search?q=${name}`
            case 2: return `https://trends.google.com/trends/trendingsearches/daily?geo=US#${name}`
            case 3: return `https://www.youtube.com/results?search_query=${name}`
        }
    }

    return (
        <Tabs aria-label="Icon tabs" defaultValue={0}>
            <TabList>
                <Tab>
                    <ListItemDecorator>
                        <TwitterIcon />
                    </ListItemDecorator>
                    Twitter
                </Tab>
                <Tab>
                    <ListItemDecorator>
                        <GoogleIcon />
                    </ListItemDecorator>
                    Google
                </Tab>
                <Tab>
                    <ListItemDecorator>
                        <YouTubeIcon />
                    </ListItemDecorator>
                    Youtube
                </Tab>
            </TabList>
            <TabPanel value={0}>
                <List aria-labelledby="basic-list-demo">
                    {twitterPosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                                <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw'}}>
                                    <Card row>
                                        <Typography>{post.name}</Typography>
                                    </Card>
                                </Badge>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={1}>
                <List aria-labelledby="basic-list-demo">
                    {googlePosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                                <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw'}}>
                                    <Card row>
                                        <Typography>{post.name}</Typography>
                                    </Card>
                                </Badge>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={2}>
                <List aria-labelledby="basic-list-demo">
                    {youtubePosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                                <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw'}}>
                                    <Card row>
                                        <Typography>{post.name}</Typography>
                                    </Card>
                                </Badge>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
      </Tabs>
    )
}
