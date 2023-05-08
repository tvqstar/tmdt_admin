import Button from '~/components/Button';
import routesConfig from '~/config/routes'

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
            <h2 style={{ marginBottom: '20px' }}>Not Found</h2>
            <Button primary to={routesConfig.home}>Về trang chủ</Button>
        </div>
    );
}

export default NotFound;
