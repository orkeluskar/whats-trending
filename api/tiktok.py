import asyncio
from TikTokApi import TikTokApi

from sanic import Sanic
from sanic.response import json
app = Sanic('tiktok')


ms_token = ["EDJtQ0264RFY9EweP3N6DC_9U-DXvKaZ8npVRmkWVwLolqspuXQk76hkes1UWeKL3xFIydPIjIxRfK91UnOycVTGmy22VVRmASFuR_mTcBcVSqO1nHiIK7piECRybru-SzJsCLpV_UdLrrJR",
            "6z7YmCJ45vaWUNt4OUQjInS45uS3t_ghhWJjJ_ZsUXv86bplVB9q4rrnFRjMb8cBgZTdBfCCMnbPMmWatNl02UWw2n4bHAU4nSFSf8lYjJbapAg0vamhcCwP8JYCN53RzdzwPrE5NHO1vcPr"]

async def trending_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=ms_token, num_sessions=1, sleep_after=3)
        videos = []
        async for video in api.trending.videos(count=30):
            author_unique_id = video.as_dict['author']['uniqueId']
            video_id = video.as_dict['id']
            cover = video.as_dict['video']['cover']
            description = video.as_dict['contents'][0]['desc']
            video_info = {
                'image_url': cover,
                'url': f'https://www.tiktok.com/@{author_unique_id}/video/{video_id}',
                'description': description
            }
            videos.append(video_info)
        return videos

 
@app.route('/')
async def index(request, path=""):
    videos = await trending_videos()
    return json(videos)


if __name__ == '__main__':
    app.run()
