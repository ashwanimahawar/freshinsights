import React from "react";
import { Sidebar } from "../components/Sidebar";
import { PagesProps } from "../interfaces/interfaces";
import { Title } from "../components/Title";
import { Paragraph } from "../components/Paragraph";
import { SubHeading } from "../components/SubHeading";
import { List } from "../components/List";
import { ListItems } from "../components/ListItems";

export const Contact: React.FC<PagesProps> = ({ posts }) => {
  return (
    <div className="w-[95%] xl:w-[85%] md:w-[95%] flex-col md:flex-row flex mx-auto justify-center gap-3 pb-10 my-10">
      <div className="w-full md:w-[60%] lg:w-full h-auto lg:w-[75%] lg:px-10 px-4 py-4 lg:pb-10 lg:pt-5 border-[1px] flex flex-col border-border rounded-xl bg-secondary-background text-primary-text gap-3">
        <Title pre="Contact Us - Fresh Insights" />
        <Paragraph text="We’re here to connect, answer your questions, and hear your feedback! Whether you have inquiries, suggestions, or want to collaborate with us, the Fresh Insights team is always excited to connect with our readers and contributors." />
        <SubHeading pre="How to reach us: " />
        <List>
          <li>
            <ListItems
              bold="General Inquiries: "
              break={true}
              post="Have a question about Fresh Insights or our content? Feel free to reach out with any general questions you may have. We’re here to help!"
            />
            <ListItems bold="Email: " mailto="freshinsightss@gmail.com" />
          </li>
          <br />
          <li>
            <ListItems
              bold="Collaboration & Partnership Opportunities: "
              break={true}
              post="Interested in collaborating with us? We’re open to partnerships, guest posts, and other creative opportunities. If you have an idea or proposal, let us know! We’re always eager to work with like-minded individuals and organizations."
            />
            <ListItems bold="Email: " mailto="freshinsightss@gmail.com" />
          </li>
          <br />
          <li>
            <ListItems
              bold="Content Submissions: "
              break={true}
              post="Are you a writer or content creator looking to contribute to Fresh Insights? We love discovering new voices and fresh perspectives. Please reach out to learn more about submission guidelines, or pitch us your idea!"
            />
            <ListItems bold="Email: " mailto="freshinsightss@gmail.com" />
          </li>
          <br />
          <li>
            <ListItems
              bold="Technical Support: "
              break={true}
              post="If you’re experiencing any technical issues or have questions about using our site, our support team is here to assist."
            />
            <ListItems bold="Email: " mailto="freshinsightss@gmail.com" />
          </li>
        </List>
        <div className="my-5">
        <SubHeading pre="Feedback & Suggestions: " />
        <Paragraph text="Your feedback helps us grow and improve. If you have any suggestions on how we can make Fresh Insights better, we’d love to hear them. Simply send us an email, and we’ll make sure your voice is heard." />
        <ListItems bold="Email: " mailto="freshinsightss@gmail.com" />
      </div>
      <Paragraph text="We look forward to connecting with you! Whether you’re here to learn more, share ideas, or become part of our community, Fresh Insights is excited to hear from you." />
      </div>
      <Sidebar posts={posts} />
    </div>
  );
};
