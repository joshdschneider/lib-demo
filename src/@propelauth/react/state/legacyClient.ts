export interface SuccessfulResponse {
  success: true;
}

export interface UnexpectedErrorResponse {
  success: false;
  error_type: "unexpected_error";
}

type UploadProfilePictureResponse = SuccessfulResponse | BadImageResponse | UnexpectedErrorResponse;

export interface BadImageResponse {
  success: false;
  error_type: "bad_image";
  message: string;
}

export function apiUploadProfilePicture(formData: FormData): Promise<UploadProfilePictureResponse> {
  return new Promise<UploadProfilePictureResponse>((resolve) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status >= 200 && http.status < 300) {
          resolve({ success: true });
        } else if (http.status === 400) {
          const jsonResponse = JSON.parse(http.responseText);
          resolve({
            success: false,
            error_type: "bad_image",
            message: jsonResponse["file"],
          });
        }
      }
    };

    http.open("post", "/api/fe/v1/update_profile_image");
    http.withCredentials = true;
    http.setRequestHeader("X-CSRF-Token", "-.-");
    http.send(formData);
  });
}

export const legacyClient = {
  uploadProfilePicture: apiUploadProfilePicture,
};
