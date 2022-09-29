import { 
    Tabs, TabList, Tab, ListItemDecorator, TabPanel,
    List, ListItem,
    Card,
    Badge,
    Typography,
    Link,
    Divider
} from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery';
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import RedditIcon from '@mui/icons-material/Reddit';
import GoogleLogo from '../../public/google-logo.svg'
import NetflixLogo from '../../public/netflix-logo.svg'
import TikTokLogo from '../../public/tiktok-logo.svg'
import SpotifyLogo from '../../public/spotify-logo.svg'
import Image from 'next/image'

export type TrendTabsProps = {
    posts: any[]
}

export default function TrendTabs(props: TrendTabsProps) {
    const { posts } = props;
    const isDesktop = useMediaQuery('(min-width:500px)');

    const twitterPosts = posts.filter(p => p.source === 1)
    const googlePosts = posts.filter(p => p.source === 2)
    const youtubePosts = posts.filter(p => p.source === 3)
    const redditPosts = posts.filter(p => p.source === 4)
    const spotifyTracks = posts.filter(p => p.source === 5)

    const getURL = (post: any) => {
        const name = encodeURIComponent(post.name)
        switch(post.source) {
            case 1: return `https://twitter.com/search?q=${name}`
            case 2: return `https://trends.google.com/trends/trendingsearches/daily?geo=US#${name}`
            case 3: return `https://www.youtube.com/results?search_query=${name}`
            case 4: return `https://www.reddit.com${post.name}`
            case 5: 
                let trackId = post.name.split('_')[0]
                return `https://open.spotify.com/track/${trackId}`
        }
    }

    const getName = (name: any) => {
        let title = name.split('/')[5].replaceAll('_', ' ')
        return title.charAt(0).toUpperCase() + title.slice(1)
    }

    const getTrackName = (name: any) => {
        return name.split('_')[1]
    }

    return (
        <Tabs aria-label="Icon tabs" defaultValue={0} size='sm' sx={{ width: isDesktop ? '75vw' : '90vw' }}>
            <TabList size='sm'>
                <Tab>
                    <ListItemDecorator>
                        <TwitterIcon sx={{ color: '#1DA1F2' }}/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                        <Image height={15} width={15} src={GoogleLogo} alt=''/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                        <YouTubeIcon sx={{ color: 'red' }}/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                        <RedditIcon sx={{ color: 'red' }}/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                    <Image height={15} width={15} src={SpotifyLogo} alt=''/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                    <Image height={15} width={15} src={NetflixLogo} alt=''/>
                    </ListItemDecorator>
                </Tab>
                <Tab>
                    <ListItemDecorator>
                    <Image height={15} width={15} src={TikTokLogo} alt=''/>
                    </ListItemDecorator>
                </Tab>
            </TabList>
            <TabPanel value={0}>
                <Typography level="h5" textAlign={'center'} alignItems='center'>Trending tweets</Typography>
                <Divider sx={{ margin: 1 }}/>
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
                <Typography level="h5" textAlign={'center'} alignItems='center'>Google daily search trends</Typography>
                <Divider sx={{ margin: 1 }}/>
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
                <Typography level="h5" textAlign={'center'}>Youtube Trending videos</Typography>
                <Divider sx={{ margin: 1 }}/>
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
            <TabPanel value={3}>
                <Typography level="h5" textAlign={'center'}>Reddit hot posts</Typography>
                <Divider sx={{ margin: 1 }}/>
                <List aria-labelledby="basic-list-demo">
                    {redditPosts.map((post: any) => (
                        <ListItem key={post.id}>
                            <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                                <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw'}}>
                                    <Card row>
                                        <Typography>{getName(post.name)}</Typography>
                                    </Card>
                                </Badge>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={4}>
                <Typography level="h5" textAlign={'center'}>Spotify top hits</Typography>
                <Divider sx={{ margin: 1 }}/>
                <List aria-labelledby="basic-list-demo">
                    {spotifyTracks.map((post: any, index: number) => (
                        <ListItem key={post.id}>
                            <Link target='_blank' rel='noreferrer' href={getURL(post)}>
                                <Badge badgeContent={post.volume} sx={{ border: 1, borderRadius: '10px', maxWidth: '70vw'}}>
                                    <Card row>
                                        <Typography>{getTrackName(post.name)}</Typography>
                                    </Card>
                                </Badge>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={5}>
                <Typography level="h5" textAlign={'center'}>Netflix top tv/film</Typography>
                <Divider sx={{ margin: 1 }}/>
                <Typography>Coming Soon!</Typography>
            </TabPanel>
            <TabPanel value={6}>
                <Typography level="h5" textAlign={'center'}>TikTok trends</Typography>
                <Divider sx={{ margin: 1 }}/>
                <Typography>Coming Soon!</Typography>
            </TabPanel>
      </Tabs>
    )
}
