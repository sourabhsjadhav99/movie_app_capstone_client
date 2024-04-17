import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"; // Assuming you're using react-icons for social icons
import { Link } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <footer className="bg-[#161d2f] p-4 text-white ">
      <ContentWrapper>
        <div className="flex justify-center items-center flex-col md:gap-6">
          <div className="text-center mb-4 md:mb-0">
            <ul className="flex gap-3">
              <li className="text-sm">Terms Of Use</li>
              <li className="text-sm">Privacy Policy</li>
              <li className="text-sm">About</li>
              <li className="text-sm">Blog</li>
              <li className="text-sm">FAQ</li>
            </ul>
          </div>
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            consectetur ipsa qui dicta harum ut sed, voluptatem deserunt nobis
            omnis iste dignissimos rem veritatis placeat blanditiis. Quos eaque,
            enim quidem autem praesentium impedit, delectus ut pariatur
            similique inventore maxime cumque repellat dolorem laudantium ab a
            vitae facere sit blanditiis temporibus sequi ad odit doloremque rem!
            Labore ducimus rerum dolorem aut saepe. Similique eius cumque quam
            animi aliquid incidunt alias possimus!
          </div>
          <div className="flex text-xl text-[#5a698f] gap-4">
            <span className="rounded-full bg-gray-400 p-1">
              <Link to={"https://www.facebook.com"}>
                <FaFacebookF />
              </Link>
            </span>
            <span className="rounded-full bg-gray-400 p-1">
              <Link to={"https://www.instagram.com"}>
                <FaInstagram />
              </Link>
            </span>
            <span className="rounded-full bg-gray-400 p-1">
              <Link to={"https://www.twitter.com"}>
                <FaTwitter />
              </Link>
            </span>
            <span className="rounded-full bg-gray-400 p-1">
              <Link to={"https://www.linkedin.com"}>
                <FaLinkedin />
              </Link>
            </span>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
