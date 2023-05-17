# Discord YouTube Bot

A self-hosted YouTube notification Discord bot that sends notifications to the server when a subscribed channel uploads a new video.

![alt text](https://i.imgur.com/9txMBWg.png)

## Commands:

**/subscribe**: Subscribe to a YouTube channel to receive new video notifications.

This command takes in the YouTube channel id and the text channel where all the notifications will be posted to. There is proper error handling that prevents duplicate YouTube channels from being added to the database, if the provided channel id was invalid, and if the server is already subscribed to the maximum amount of channels (20).

**/unsubscribe**: Unsubscribe from a YouTube channel and stop all video notifications.

This command takes in the YouTube channel id that the server will unsubscribe from. The bot also checks to see if there is even a channel with that id in the database to remove and if there aren't any channels with that id the bot responds with an error message.

**/unsubscribe-all**: Unsubscribe from all YouTube channels and stop all video notifications.

This command essentially works the same as the previous but it unsubscribes from every single channel in the database. An error message is also displayed to the user if there arent any channels in the database to remove.

## Self-Hosting:

To self host this bot in your own server you would have to set up these environment variables.

### Environment Variables

- `DISCORD_TOKEN`: Discord bot token
- `CLIENT_ID`: Discord application id
- `GUILD_ID`: Discord server id
- `DATABASE_URI`: MongoDB database uri
- `YOUTUBE_API_KEY`: YouTube API key

## How It's Made:

**Tech used:** JavaScript, Node.js, Discord.js, MongoDB, YouTube API

This application was made using the discord.js library which made interacting with the Discord API very easy. The application uses the YouTube API to fetch the latest video uploaded by the channel. The bot allows a server to subscribe to 20 different YouTube channels which are stored on MongoDB. Node Schedule is used to set up a cron job that is done every 5 minutes, which goes through all the YouTube channels in the database that the server is subscribed to and checks if any of them have uploaded a new video.

Each YouTube channel that is stored on the database keeps track of the channel id (so no duplicate channels get added to the database), upload playlist id (where every video is uploaded by default), channel icon, the id of the latest video which is used to compare against the current latest video retrieved by the YouTube API and the text channel id (where in the discord server the videos get posted to).

## Optimizations:

The reasoning behind there being a limit of 20 subscribed channels is due to the YouTube API having a quota limit on their free tier of the API. The limit is 10,000 queries per day and since I wanted to check for a new video every 5 minutes I had to place a stop on the number of channels a server could be subscribed to.

This is also why I didn't use their search endpoint for fetching that data since it had a cost of 100 when compared to just using the playlistItems or channels endpoint which had a cost of 1. I would also like to improve on how searching for channels is done since users are required to use the channel id to find the channel they would like to subscribe to since the API sometimes does not find the channel by using the name. In the future, if I am able to figure out another way to work with the limitations of YouTube API I would expand on this bot to make work on multiple servers.

## Lessons Learned:

I learned how to work with the discord.js library using their documentation and found it really easy to get a bot up and running. The discord.js documentation was very clear on how to create commands for the bot and how to work with all the tools that discord provides such as embeds which can be styled in many different ways. I was able to work with the YouTube API and its limitations to get the bot working properly and set up a cron job that runs every 5 minutes to fetch data from the YouTube API.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**MyBootList API:** https://github.com/vzMars/mybooklist-api

**GameBlog API:** https://github.com/vzMars/gameblog-api

**MangaNotifications:** https://github.com/vzMars/manga-notifications
