import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faThermometerHalf,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

const LeadFunnel = () => {
  return (
    <>
      <style>
        {`
          @keyframes moveAndRotate {
            0% {
              transform: translateX(-100%) rotateY(0deg);
              opacity: 0;
            }
            50% {
              transform: translateX(0) rotateY(10deg);
              opacity: 1;
            }
            100% {
              transform: translateX(100%) rotateY(0deg);
              opacity: 0;
            }
          }

          .animate-funnel > div {
            animation: moveAndRotate 8s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
            transform-origin: center;
            perspective: 1000px;
            backface-visibility: hidden;
            animation-fill-mode: both;
          }

          .group:hover {
            animation: none;
          }

          .funnel-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            overflow: hidden;
          }

          .funnel-items {
            display: flex;
            width: 100%;
            align-items: center;
            gap: 0; /* Remove gap */
          }

          .funnel-item {
            position: relative;
            text-align: center;
            padding: 16px; /* Increase padding for better appearance */
            color: white;
            transition: transform 0.3s;
            flex-shrink: 0;
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%); /* Funnel shape */
            margin: 0 5px; /* Add margin to avoid visual overlap */
          }

          .hot {
            background: linear-gradient(to right, #ff4500, #ff6347); /* Red-Orange colors for Hot */
            width: 50%; /* Largest width for Hot */
          }

          .warm {
            background: linear-gradient(to right, #ffa500, #ffcc00); /* Orange-Yellow colors for Warm */
            width: 30%; /* Medium width for Warm */
          }

          .cold {
            background: linear-gradient(to right, #00bfff, #1e90ff); /* Light Blue-Dark Blue colors for Cold */
            width: 20%; /* Smallest width for Cold */
          }
        `}
      </style>
      <div className="p-10 bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center">
        {/* Funnel Structure */}
        <div className="funnel-container bg-gray-300 rounded-md">
          <div className="funnel-items animate-funnel">
            {/* Hot */}
            <div className="group funnel-item hot shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faFire} />
                Hot
              </h2>
              <ul className="text-sm space-y-1">
                <li>Exclusive Offers</li>
                <li>One-on-One Consultations</li>
                <li>Free Trials</li>
              </ul>
            </div>

            {/* Warm */}
            <div className="group funnel-item warm shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faThermometerHalf} />
                Warm
              </h2>
              <ul className="text-sm space-y-1">
                <li>Product Demos</li>
                <li>Customer Reviews</li>
                <li>Webinars</li>
              </ul>
            </div>

            {/* Cold */}
            <div className="group funnel-item cold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faSnowflake} />
                Cold
              </h2>
              <ul className="text-sm space-y-1">
                <li>Social Media Ads</li>
                <li>Email Campaigns</li>
                <li>SEO Content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadFunnel;
