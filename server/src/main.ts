import app from './app';

const PORT = process.env.PORT || 5000;

const bootstrap = async (): Promise<void> => {
    try {
        app.listen(Number(PORT), () => {
            console.log(`server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

void bootstrap();