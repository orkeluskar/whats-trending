import { 
    Tabs, TabList, Tab, ListItemDecorator, TabPanel,
    List, ListItem,
    Card,
    Badge
} from '@mui/joy';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

export type TrendTabsProps = {
    posts: any[]
}

export default function TrendTabs(props: TrendTabsProps) {
    const { posts } = props;

    const twitterPosts = posts.filter(p => p.source === 1)
    const googlePosts = posts.filter(p => p.source === 2)

    const getURL = (post: any) => {
        const name = encodeURIComponent(post.name)
        if (post.source === 1) {
          return `https://twitter.com/search?q=${name}`
        }
        return `https://trends.google.com/trends/trendingsearches/daily?geo=US#${name}`
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
            </TabList>
            <TabPanel value={0}>
                <List aria-labelledby="basic-list-demo">
                    {twitterPosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px'}}>
                                <Card>
                                    <div><a href={getURL(post)} target='_blank' rel="noreferrer">{post.name}</a></div>
                                </Card>
                            </Badge>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={1}>
                <List aria-labelledby="basic-list-demo">
                    {googlePosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px'}}>
                                <Card>
                                    <div><a href={getURL(post)} target='_blank' rel="noreferrer">{post.name}</a></div>
                                </Card>
                            </Badge>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
      </Tabs>
    )
}
