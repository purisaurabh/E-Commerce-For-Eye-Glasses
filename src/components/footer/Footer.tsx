
import { AiFillGithub, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="bg-gray-800 text-white py-3 border-t border-gray-700">
            <div className="container mx-auto text-center">
                <p className="mb-2">Copyright © 2024. All Rights Reserved</p>
                <div className="flex flex-nowrap justify-center gap-3">
                    <a href="https://github.com/purisaurabh" className="hover:scale-125 transition-transform duration-200">
                        <AiFillGithub className="text-3xl text-white hover:text-gray-400" />
                    </a>
                    <a href="https://www.linkedin.com/in/purisaurabh01" className="hover:scale-125 transition-transform duration-200">
                        <AiOutlineLinkedin className="text-3xl text-white hover:text-gray-400" />
                    </a>
                    <a href="https://twitter.com/_puri_saurabh" className="hover:scale-125 transition-transform duration-200">
                        <AiOutlineTwitter className="text-3xl text-white hover:text-gray-400" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
