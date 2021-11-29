export type HomeControllerType = ReturnType<typeof HomeController>;

function HomeController(props: any) {
    console.log(props);
    return {
        test: "This is a test"
    }
}

export default function Home(props: any) {
    const controller = HomeController(props);
    return <div>Home screen</div>
}