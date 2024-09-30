function Error() {
  return (
    <div className="py-8 px-4 mt-16 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-white">Something's missing.</p>
        <p className="mb-4 font-light text-white">
         Sorry, we can't find that page.
         You'll find lots to explore on the home page.
         </p>
        <a href="/" className="inline-flex text-white bg-[#1d4ed8] font-medium rounded-lg 
          text-sm px-5 py-2.5 text-center  my-4">
          Back to Homepage
        </a>
      </div>   
    </div>
  );
}

export default Error;