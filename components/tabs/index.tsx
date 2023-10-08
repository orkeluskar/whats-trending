import {
    Tabs, TabList, Tab, ListItemDecorator, TabPanel,
    Typography,
    Divider
} from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery';
import TabPanelContent from './tabPanelContent';
import usePostData from './hooks';
import CONSTANTS from '../../utils/constants';
import { useEffect, useState } from 'react';

export type TrendTabsProps = {
    posts: any[]
}

export default function TrendTabs(props: TrendTabsProps) {
    const { postGroups, getURL, getName, getTrackName, tabData } = usePostData(props.posts);
    const isDesktop = useMediaQuery('(min-width:500px)');

    // Then you can access specific post groups like this:
    const googlePosts = postGroups[CONSTANTS.SOURCE.GOOGLE];
    const youtubePosts = postGroups[CONSTANTS.SOURCE.YOUTUBE];
    const redditPosts = postGroups[CONSTANTS.SOURCE.REDDIT];
    const spotifyTracks = postGroups[CONSTANTS.SOURCE.SPOTIFY];
    const netflixTops = postGroups[CONSTANTS.SOURCE.NETFLIX] || [];

    const [isAppMode, setIsAppMode] = useState(false);
    useEffect(() => {
        // Check if the app is running in standalone mode on iOS
        const isRunningInAppMode = () =>
            //@ts-ignore
            (window.navigator.standalone !== undefined && window.navigator.standalone) ||
            (window.matchMedia('(display-mode: standalone)').matches);

        setIsAppMode(isRunningInAppMode());
    }, []);

    return (
        <Tabs aria-label="Icon tabs" defaultValue={0} size='sm' sx={{ width: isDesktop ? '75vw' : '90vw' }}>
            <TabList
                size='lg'
                sx={{
                    bottom: 0,
                    zIndex: 2,
                    position: isDesktop ? 'static' : 'fixed',
                    marginLeft: isDesktop ? 'inherit' : '-5vw',
                    width: isDesktop ? '75vw' : '100vw',
                    borderRadius: isDesktop ? '0.5rem' : 0,
                    paddingBottom: isAppMode ? '1rem' : 0
                }}
            >
                {tabData.map((tab, index) => (
                    <Tab key={index} orientation="vertical">
                        <ListItemDecorator>
                            {tab.icon}
                        </ListItemDecorator>
                    </Tab>
                ))}
            </TabList>

            <TabPanel value={0}>
                <TabPanelContent posts={googlePosts} title='Google daily search trends' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={1}>
                <TabPanelContent posts={youtubePosts} title='Youtube Trending videos' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={2}>
                <TabPanelContent posts={redditPosts} title='Reddit hot posts' getURL={getURL} getName={getName} />
            </TabPanel>
            <TabPanel value={3}>
                <TabPanelContent posts={spotifyTracks} title='Spotify top hits' getURL={getURL} getName={getTrackName} />
            </TabPanel>
            <TabPanel value={4}>
                <TabPanelContent posts={netflixTops} title='Netflix top' getURL={getURL} getName={p => p} />
            </TabPanel>
            <TabPanel value={5}>
                <Typography level="h5" textAlign={'center'}>TikTok trends</Typography>
                <Divider sx={{ margin: 1 }} />
                <Typography>Coming Soon!</Typography>
            </TabPanel>
        </Tabs>
    )
}
