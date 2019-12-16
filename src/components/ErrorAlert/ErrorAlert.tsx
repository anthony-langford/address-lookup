import React from 'react';
import { Alert } from 'antd';

interface ErrorAlertProps {
  error?: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) =>
  error ? (
    <Alert
      message={error}
      type="error"
      showIcon
      style={{ margin: '0 0 8px 0' }}
    />
  ) : null;

export default ErrorAlert;
