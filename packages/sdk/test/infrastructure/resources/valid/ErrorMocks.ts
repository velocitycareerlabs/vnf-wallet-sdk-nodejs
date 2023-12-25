class ErrorMocks {
    static Payload =
        '{"error":"Bad Request","errorCode": "proof_jwt_is_required","message":"proof.jwt is missing","statusCode": 400}';
    static Error = "Bad Request";
    static ErrorCode = "proof_jwt_is_required";
    static Message = "proof.jwt is missing";
    static StatusCode = 400;
}

export { ErrorMocks };
