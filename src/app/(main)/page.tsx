import CardList from "@/components/CardList";

const Home = () => {
  return (

    <section className="mt-3 w-full flex flex-col gap-3">
      <h1 className="text-xl font-bold  ">Latest published articles</h1>
      <div className=" flex flex-1 flex-col gap-4">
        <CardList page={1} />
      </div>
    </section>

  );
};

export default Home;
