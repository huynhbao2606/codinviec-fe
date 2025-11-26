export function getGoogleErrorMessages(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        access_denied: "Bạn đã từ chối quyền truy cập. Vui lòng thử lại.",
        invalid_request: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
        unauthorized_client: "Ứng dụng không được phép truy cập. Vui lòng liên hệ quản trị viên.",
        disabled_client: "Ứng dụng OAuth đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để kích hoạt lại.",
        unsupported_response_type: "Loại phản hồi không được hỗ trợ. Vui lòng thử lại.",
        invalid_scope: "Phạm vi truy cập không hợp lệ. Vui lòng thử lại.",
        server_error: "Lỗi máy chủ. Vui lòng thử lại sau.",
        temporarily_unavailable: "Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.",

        no_email: "Không tìm thấy email từ tài khoản Google. Vui lòng thử lại.",
        no_token: "Không thể tạo token. Vui lòng thử lại.",
        logged_in: "Tài khoản này đã được đăng nhập ở nơi khác!",
        email_err: "Lỗi xử lý email. Vui lòng thử lại.",
        token_err: "Lỗi xử lý token. Vui lòng thử lại.",
    };

    return errorMessages[errorCode] || "Đăng nhập thất bại. Vui lòng thử lại.";
}