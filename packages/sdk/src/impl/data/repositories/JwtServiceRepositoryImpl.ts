import VCLDidJwk from "../../../api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "../../../api/entities/VCLDidJwkDescriptor";
import VCLError from "../../../api/entities/VCLError";
import VCLJwkPublic from "../../../api/entities/VCLJwkPublic";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLJwtDescriptor from "../../../api/entities/VCLJwtDescriptor";
import VCLResult from "../../../api/entities/VCLResult";
import JwtService from "../../domain/infrastructure/jwt/JwtService";
import JwtServiceRepository from "../../domain/repositories/JwtServiceRepository";

export default class JwtServiceRepositoryImpl implements JwtServiceRepository {
    constructor(private readonly jwtService: JwtService) {}

    decode(
        encodedJwt: string,
        completionBlock: (r: VCLResult<VCLJwt>) => any
    ): void {
        try {
            let parsed = this.jwtService.parse(encodedJwt);
            if (parsed) {
                completionBlock(new VCLResult.Success(new VCLJwt(parsed)));
                return;
            }

            throw new Error("Failed to parse $encodedJwt");
        } catch (ex: any) {
            completionBlock(new VCLResult.Error(new VCLError(ex)));
        }
    }
    verifyJwt(
        jwt: VCLJwt,
        jwkPublic: VCLJwkPublic,
        completionBlock: (r: VCLResult<boolean>) => any
    ): void {
        this.jwtService
            .verify(jwt, jwkPublic.valueStr)
            .then((it) => {
                completionBlock(new VCLResult.Success(it));
            })
            .catch((ex) => {
                completionBlock(new VCLResult.Error(new VCLError(ex)));
            });
    }
    generateSignedJwt(
        jwtDescriptor: VCLJwtDescriptor,
        completionBlock: (r: VCLResult<VCLJwt>) => any
    ): void {
        this.jwtService
            .sign(jwtDescriptor)
            .then((it) => {
                if (it) {
                    completionBlock(new VCLResult.Success(new VCLJwt(it)));
                } else {
                    completionBlock(
                        new VCLResult.Error(
                            new VCLError(
                                `Failed to sign ${jwtDescriptor.payload}`
                            )
                        )
                    );
                }
            })
            .catch((e) => {
                completionBlock(new VCLResult.Error(new VCLError(e)));
            });
    }
    generateDidJwk(
        didJwkDescriptor: Nullish<VCLDidJwkDescriptor>,
        completionBlock: (r: VCLResult<VCLDidJwk>) => any
    ): void {
        try {
            completionBlock(
                new VCLResult.Success(
                    this.jwtService.generateDidJwk(didJwkDescriptor)
                )
            );
        } catch (e: any) {
            completionBlock(new VCLResult.Error(new VCLError(e)));
        }
    }
}
