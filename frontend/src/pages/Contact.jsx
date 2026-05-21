import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate Email Sending
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#050505] text-white p-6 pt-32">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* INFO SIDE */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">CONTACT COMMAND</h1>
                        <p className="text-gray-400">Deploying a custom enterprise solution? Need priority support? Our operators are standing by on encrypted channels.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="bg-cyan-900/20 p-3 rounded-lg border border-cyan-900/50">
                                <Mail className="text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Encrypted Email</h3>
                                <p className="font-mono text-sm">secure@threatscope.io</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="bg-cyan-900/20 p-3 rounded-lg border border-cyan-900/50">
                                <Phone className="text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Emergency Hotline</h3>
                                <p className="font-mono text-sm">+1 (800) CYBER-DEF</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="bg-cyan-900/20 p-3 rounded-lg border border-cyan-900/50">
                                <MapPin className="text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">HQ Operations</h3>
                                <p className="font-mono text-sm">Silicon Valley, Classified Sector 7</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FORM SIDE */}
                <div className="bg-black/60 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm">
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-500 uppercase">First Name</label>
                                    <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white outline-none focus:border-cyan-500 transition-colors" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-500 uppercase">Last Name</label>
                                    <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white outline-none focus:border-cyan-500 transition-colors" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-cyan-500 uppercase">Work Email</label>
                                <input type="email" className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white outline-none focus:border-cyan-500 transition-colors" placeholder="john@company.com" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-cyan-500 uppercase">Clearance Level / Subject</label>
                                <select className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-gray-400 outline-none focus:border-cyan-500 transition-colors">
                                    <option>General Inquiry</option>
                                    <option>Enterprise Sales</option>
                                    <option>Report A Bug</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-cyan-500 uppercase">Message Transmission</label>
                                <textarea className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white h-32 outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Enter your query..." required></textarea>
                            </div>

                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded flex items-center justify-center gap-2 transition-all">
                                <Send size={18} /> TRANSMIT MESSAGE
                            </button>
                        </form>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-20">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <Send className="text-green-500 w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION RECEIVED</h3>
                            <p className="text-gray-400">Our operators will establish contact shortly.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Contact;