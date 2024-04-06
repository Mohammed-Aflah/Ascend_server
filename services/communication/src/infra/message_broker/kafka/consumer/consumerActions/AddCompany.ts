import { ICompanyUseCase } from "../../../../../application/interfaces/repo_interface/ICompanyUsecase";
import { IUserUsecase } from "../../../../../application/interfaces/useCase_Interface/IuserUsecase";
import { Company } from "../../../../../domain/entities/company.entity";

export class CompanyAddConsumer {
  private companyUseCase: ICompanyUseCase;
  constructor(companyUsecase: ICompanyUseCase) {
    this.companyUseCase = companyUsecase;
  }

  async addCompany(body: Company) {
    try {
      const user = await this.companyUseCase.addCompany(body);
      console.log("🚀 ~ company ~ addUser ~ user:", user);
    } catch (error) {
      console.log("🚀 ~ company ~ addUser ~ error:", error);
    }
  }
}
