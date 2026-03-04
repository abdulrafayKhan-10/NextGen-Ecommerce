import React from 'react';

interface TitleProps {
  text1: string;
  text2: string;
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-4 items-center mb-8 justify-center w-full'>
      <p className='w-12 sm:w-16 h-[2px] bg-emerald-400 rounded-full'></p>
      <h2 className='text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-800 drop-shadow-sm'>
        {text1} <span className='text-emerald-500'>{text2}</span>
      </h2>
      <p className='w-12 sm:w-16 h-[2px] bg-emerald-400 rounded-full'></p>
    </div>
  );
};

export default Title;
