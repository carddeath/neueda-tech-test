Thought Process:

1. I feel this project is too large to program in 2-3 hours effectively with all requirements

- I started by creating a nextjs app as it's recommended by react to use a framework these days rather than vanilla CRA
- After seeing the data once I pulled it, I decided to create types so I could use type inferance for each record for the stock item
- Error handling was brought in early on to ensure I could catch the errors when modifying the URL
- Mapping the data and getting in a table was my first priority
- Pagination and filters had to be worked out next. Making sure they worked together and had a central component to go back to that could manage both the filtered data and the amount of records to show on the screen
- Decided to go with recharts for my charting library, haven't implemented it perfectly and just forced a subset of data to see the points more clearly

## Didn't do due to 3 hour limit reached - I'm not going to lie about the pace of my development

I didn't add responsive design but if I did I'd have figured out a smaller table structure or a card based layout for data items for mobile
Using a search bar I didn't really know what you'd want me to search on but I understand the use of debounce to ensure that searches aren't done for every key stroke. Again no time within the
I would normally use SCSS rather than CSS for my styled components but I decided not to in this case
I'd have probably used dayjs or some date library to format dates better for the graph, given the time as well I'd have probably found a way to reduce/aggregate the data so I could show it in a more meaningful way rather than every 5 minutes
I didn't add unit tests, I just didn't have time with the amount of work to do within the 3 hours. I'd have added tests around:

- what happens when hitting the filter button, does it order correctly? Does it work well when using the dropdown and then the button to sort etc
- With the date filtering I'd have tested the ranges to ensure the only data coming back was within the datetime ranges provided
- I'd have added aria-labels to certain elements for accessibility and I'd have looked at using useMemo for the data if it wasn't going to change frequently (such as when the market is closed)
- Id have made the sorting work for the dropdown as well as the sort buttons. Right now it feels like a bad user experience but it does the job

As a final point, I doubt I'll get the next interview but I feel there is far too much in this test to have a candidate perform it well within 2/3 hours. As I said above. I'd rather be honest than spend a whole weekend on it and lie.

Thank you for the opportunity
