# mode-takehome - Time Series Data Presentation

## Development:

1. Run the following commands.
```
npm install
npm run dev
```

2. Go to http://localhost:5173/

## Requirements

### Your Task
Create a React app that allows a user to input a date. It should then call the aforementioned API
endpoint to fetch the time series data for that entire day. Use the UTC time zone for the "begin"
and "end" timestamps. For example, if the user wants to fetch the data for May 24, 2023 ,
"begin" will be "2023-05-24T00:00:00Z", and "end" will be "2023-05-24T23:59:59Z".

The app should then present the data in two different ways––in a line graph and as in a data
table.

- The line graph should have "time" as the X-axis and "value" as the Y-axis.
- The data table should have two columns. The first column is "time" and the second is
"value". Because there are a large number of data points (over 1000), you should use
some kind of pagination for the table rows.


### Additional Instructions
- You must use TypeScript.
- You may use MUI, or any component library/framework of your choice.
- You may use any chart library of your choice to render the line graph.
- Use a date picker for the date input field.
- Your app should provide proper feedback to the user if it fails to fetch the time series
data from the API server.
- Use a state management system to store the time series data returned from the API
server.

### Key Considerations
Treat this project as building a prototype. Focus on functionality and ease of use. If you see
ambiguity in the spec, make your best judgment and annotate/comment in the code about these
decisions.

When we review your work, we will focus on the following areas:
- General code quality
- Functional correctness
- Computational and memory efficiency
- Sufficient error and edge case handling
- Easy for others to understand and maintain
- Web-related
- Precision and attention to details (e.g. element sizing, alignment, spacing, etc.)
- Responsiveness (app should work in screens of all sizes)
- Cross-browser compatibility (app should work on Chrome, Firefox and Safari)
- React-related
- Organization of components
- State management
