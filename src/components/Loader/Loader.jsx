import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <Oval
            height={36}
            width={36}
            color="grey"
            wrapperStyle={{margin: '0 auto'}}
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#ababab"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    );
};

export default Loader;