

export const Separator = ({ character }: { character?: string }) => {


    return (
        <div className="flex items-center">

            <div className=" text-gray-900" >
                <div className="flex overflow-hidden">
                    {
                        Array(100).fill('').map((_, i) => (
                            character
                        ))
                    }

                </div>
            </div>

        </div >
    );
};

