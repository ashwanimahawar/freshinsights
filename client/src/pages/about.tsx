import React from "react";
import { Sidebar } from "../components/Sidebar";
import { PagesProps } from "../interfaces/interfaces";
import { Title } from "../components/Title";
import { Paragraph } from "../components/Paragraph";
import { SubHeading } from "../components/SubHeading";
import { List } from "../components/List";
import { ListItems } from "../components/ListItems";

export const About: React.FC<PagesProps> = ({ posts }) => {
  return (
    <div className="w-[95%] xl:w-[85%] md:w-[95%] flex-col md:flex-row flex mx-auto justify-center gap-3 pb-10 my-10">
      <div className="w-full md:w-[60%] lg:w-full h-auto lg:w-[75%] lg:px-10 px-4 py-4 lg:pb-10 lg:pt-5 border-[1px] flex flex-col border-border rounded-xl bg-secondary-background text-primary-text gap-3">
        <Title pre="About Us - Fresh Insights" />
        <SubHeading pre="Who are we?" />
        <Paragraph
          margin="0px"
          padding="5px 0px"
          text="Welcome to Fresh Insights – a blog dedicated to bringing fresh, meaningful perspectives on topics that matter to you. Here, we believe in the power of ideas and the unique insights each voice brings. Our goal is to create a dynamic community where readers and writers alike can find inspiration, connect over shared interests, and engage in thoughtful discussions."
        />
        <Paragraph
          margin="0px"
          padding="5px 0px"
          text="At Fresh Insights, you'll find articles that cover a broad range of topics, from personal development and creative arts to technology, culture, and beyond. Every post is crafted with a focus on quality and authenticity, making this platform a place where content truly resonates. We aim to foster an environment where content isn’t just consumed but enjoyed, shared, and discussed, allowing ideas to flourish and grow."
        />
        <SubHeading pre="What we offer:" />
        <List>
          <li>
          <ListItems
            bold="Diverse Content: "
            post="A variety of topics tailored to ignite curiosity and provoke
            thought, from in-depth analyses to creative explorations."
          /></li>
          <li>
          <ListItems
            bold="Interactive Community: "
            post="Engage with writers and fellow readers by commenting, sharing your
            own perspectives, and becoming a part of our community."
          /></li>
          <li>
          <ListItems
            bold="User-Friendly Experience: "
            post="Easy navigation and a responsive interface, making it simple to
            explore posts, create your own, or join conversations."
          /></li>
        </List>
        <Paragraph text="Whether you're here to discover new ideas, share your voice, or simply enjoy a bit of creative reading, we’re glad to have you as part of the Fresh Insights family. Join us as we explore the world through unique perspectives and stay curious, inspired, and informed." />
        <Paragraph
          margin="0px"
          padding="5px 0px"
          text="Stay curious, stay inspired, and keep exploring!"
        />
        <p className="py-2 text-md text-secondary-text break-words">
          For any questions, collaborations, or feedback, please reach out to us
          at
          <span className="text-blue-700 hover:underline cursor-pointer font-semibold">
            {" "}
            <a href="mailto:freshinsightss@gmail.com">
              freshinsightss@gmail.com.
            </a>{" "}
          </span>
          We'd love to hear from you!
        </p>
      </div>
      <Sidebar posts={posts} />
    </div>
  );
};
