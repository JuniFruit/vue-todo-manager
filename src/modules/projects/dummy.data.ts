export const dummyProjects = [
  {
    title: "Design a new website",
    person: "The Net Ninja",
    due: "1st Jan 2019",
    status: "ongoing",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
  },
  {
    title: "Code up the homepage",
    person: "Chun Li",
    due: "10th Jan 2019",
    status: "complete",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
  },
  {
    title: "Design video thumbnails",
    person: "Ryu",
    due: "20th Dec 2018",
    status: "complete",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
  },
  {
    title: "Create a community forum",
    person: "Gouken",
    due: "20th Oct 2018",
    status: "overdue",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
  },
];

export type IProjectItem = (typeof dummyProjects)[0];
