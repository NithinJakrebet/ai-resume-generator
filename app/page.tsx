import React from 'react';

const PageComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center py-4">
        <div className="text-white text-lg font-bold">LOGO</div>
        <div>
          <button className="bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-4 border border-white rounded mr-2">
            Login
          </button>
          <button className="bg-white text-black font-semibold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border-2 rounded-lg p-6 flex items-center justify-center">
          <h1 className="text-2xl font-bold">AI Generated Resume Recommendations</h1>
        </section>
        <section className="flex flex-col space-y-8">
          <div className="border-2 rounded-lg p-4 flex items-center justify-center">
            <h2 className="text-xl font-semibold">Tailored for specific job descriptions</h2>
          </div>
          <div className="border-2 rounded-lg p-4 flex items-center justify-center">
            <h2 className="text-xl font-semibold">Powered by Llama</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PageComponent;
