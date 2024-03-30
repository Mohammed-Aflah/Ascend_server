import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetAllJob {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async getAlljob(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      let category = String(req.query.category);
      console.log("🚀 ~ GetAllJob ~ getAlljob ~ category:", category);
      let employment = String(req.query.employment);
      console.log("🚀 ~ GetAllJob ~ getAlljob ~ employment:", employment);
      const { applicant: jobs, totalPages } = await this.useCase.getAllJob(
        page,
        pageSize,
        category,
        employment
      );
      res.status(200).json({
        status: true,
        jobs,
        messsage: "Succesfull",
        totalPages,
      });
    } catch (error) {
      next(error);
    }
  }
}
