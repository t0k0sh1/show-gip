"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaClipboard } from "react-icons/fa";

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // ipify APIを使用してIPアドレスを取得
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address", error);
      }
    };
    fetchIp();
  }, []);

  // クリップボードにIPアドレスをコピーする関数
  const handleCopy = () => {
    navigator.clipboard.writeText(ipAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒後にコピー状態をリセット
    });
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Global IP Address</h1>
          {ipAddress ? (
              <div className="inline-flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <p className="text-lg text-gray-900 dark:text-white mr-4">{ipAddress}</p>
                <FaClipboard
                    onClick={handleCopy}
                    className={`cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400`}
                    title="Copy to clipboard"
                    size={24} // アイコンのサイズ
                />
              </div>
          ) : (
              <p className="text-gray-700 dark:text-gray-300">Fetching IP address...</p>
          )}
          {copied && <p className="text-green-500 mt-2">Copied to clipboard!</p>}
        </div>
      </div>
  );
}
