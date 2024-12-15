import FeedBackCart from "./FeedBackCart"

const FeedBack = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-16">
        <h1 className="text-purple2 text-3xl font-mono">Témoignages</h1>
        <div className="feedBackContainer bg-white p-10 w-fit h-fit ">
            <FeedBackCart/>

        </div>
      
    </div>
  )
}

export default FeedBack
