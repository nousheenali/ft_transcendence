import LatestMessage from "@/components/Chat/LatestMsgsBox/LatestMessage/LatestMessage";

/**
 * A component that renders the LatestMsgsBox component, which is a box that contains the latest messages
 * of the user. It is responsible for rendering the LatestMessage component for each message in the messages
 * array.
 * 
 * The messages array is an array of objects, each object represents a message and it contains the following properties:
 * 
 * {sender} is an object that contains the following properties:
 *  {name} is a string that represents the name of the sender
 * {profileImage} is an object that contains the following properties:
 * {alt} is a string that represents the alt attribute of the profile image
 * {src} is a string that represents the src attribute of the profile image
 * {isOnline} is a boolean that represents whether the sender is online or not
 * 
 * {messageTime} is a string that represents the time of the message
 * {messageContent} is a string that represents the content of the message
 * 
 */
export default function LatestMsgsBox(props: {message:string}) {
  const {message} = props;

  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {/* {messages.map((message:any, index:number) => (
        <div className="py-1">
          <LatestMessage
            key={index}
            sender={message.sender}
            messageTime={message.messageTime}
            messageContent={message.messageContent}
          />
        </div>
      ))} */}
    </div>
  );
}

/**
 * Example of a message object:
 * ----------------------------
 * 	sender: {
		name: "Ghaiath Abdoush",
		profileImage: {
		  alt: "Ghaiath Abdoush Profile Picture",
		  src: "av1.svg",
		},
		isOnline: false,
	  },
	  messageTime: "2m ago",
	  messageContent: "Lorem Ipsum 1",
	},
 */


  /**
   * The getStaticProps function is used to fetch the data that is needed to render the LatestMsgsBox component,
   * it is used to fetch the messages array from the database.
   */


  export async function getStaticProps() {
    const {messages} = await import("../../../data/messages.json");

    console.log(messages);

    return {
        props: {
            messages: messages,
        },
    }
}