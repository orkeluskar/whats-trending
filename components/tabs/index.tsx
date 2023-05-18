import {
    Tabs, TabList, Tab, ListItemDecorator, TabPanel,
    Typography,
    Divider
} from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery';
import TabPanelContent from './tabPanelContent';
import usePostData from './hooks';

export type TrendTabsProps = {
    posts: any[]
}

export default function TrendTabs(props: TrendTabsProps) {
    const { postGroups, getURL, getName, getTrackName, tabData } = usePostData(props.posts);
    const isDesktop = useMediaQuery('(min-width:500px)');

    // Then you can access specific post groups like this:
    const twitterPosts = postGroups[1];
    const googlePosts = postGroups[2];
    const youtubePosts = postGroups[3];
    const redditPosts = postGroups[4];
    const spotifyTracks = postGroups[5];

    return (
        <Tabs aria-label="Icon tabs" defaultValue={0} size='sm' sx={{ width: isDesktop ? '75vw' : '90vw' }}>
            <TabList size='sm'>
                {tabData.map((tab, index) => (
                    <Tab key={index}>
                        <ListItemDecorator>
                            {tab.icon}
                        </ListItemDecorator>
                    </Tab>
                ))}
            </TabList>
            <TabPanel value={0}>
                <TabPanelContent posts={twitterPosts} title='Trending tweets' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={1}>
                <TabPanelContent posts={googlePosts} title='Google daily search trends' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={2}>
                <TabPanelContent posts={youtubePosts} title='Youtube Trending videos' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={3}>
                <TabPanelContent posts={redditPosts} title='Reddit hot posts' getURL={getURL} getName={getName} />
            </TabPanel>
            <TabPanel value={4}>
                <TabPanelContent posts={spotifyTracks} title='Spotify top hits' getURL={getURL} getName={getTrackName} />
            </TabPanel>
            <TabPanel value={5}>
                <Typography level="h5" textAlign={'center'}>Netflix top tv/film</Typography>
                <Divider sx={{ margin: 1 }} />
                <Typography>Coming Soon!</Typography>
            </TabPanel>
            <TabPanel value={6}>
                <Typography level="h5" textAlign={'center'}>TikTok trends</Typography>
                <Divider sx={{ margin: 1 }} />
                <Typography>Coming Soon!</Typography>
            </TabPanel>
        </Tabs>
    )
}
