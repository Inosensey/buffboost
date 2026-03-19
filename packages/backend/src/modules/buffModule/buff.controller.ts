import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BuffService } from './buff.service';
import { ApiResponse } from 'src/utils/responseShaper';
import { MutateBuffDto } from './buff.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permission.guard';

@Controller('buffs')
export class BuffController {
  constructor(private readonly buffService: BuffService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get()
  async getBuffs() {
    const buffs = await this.buffService.getBuffs();
    return ApiResponse.success(buffs, 'Buffs retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/id')
  async getBuff(@Param('id') id: string) {
    const buff = await this.buffService.getBuff(id);
    return ApiResponse.success(buff, 'Buff retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/purchased-buffs/:paymentId')
  async getPurchasedBuffs(@Param('paymentId') paymentId: string) {
    const buff = await this.buffService.getPurchasedBuffsByPaymentId(paymentId);
    return ApiResponse.success(buff, 'Purchased Buffs retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/purchased-buffs-today/:userId')
  async getCurrentPurchasedBuffsToday(@Param('userId') userId: string) {
    const buff = await this.buffService.getCurrentPurchasedBuffsToday(userId);
    return ApiResponse.success(
      buff,
      'Todays Purchased Buffs retrieved successfully',
    );
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/purchased-buffs-history/:userId')
  async getCurrentPurchasedBuffsHistory(@Param('userId') userId: string) {
    const buff = await this.buffService.getCurrentPurchasedBuffsHistory(userId);
    return ApiResponse.success(
      buff,
      'Purchased Buffs History retrieved successfully',
    );
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/buff-subscription/:sessionId')
  async getBuffSubscriptionFromSession(@Param('sessionId') sessionId: string) {
    const buff =
      await this.buffService.getBuffSubscriptionFromSession(sessionId);
    return ApiResponse.success(
      buff,
      'Buff subscription retrieved successfully',
    );
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/active-buff/:userId')
  async getCurrentActiveBuff(@Param('userId') userId: string) {
    const buff = await this.buffService.getUserActiveBuff(userId);
    return ApiResponse.success(
      buff,
      'Current Active Buff retrieved successfully',
    );
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('/create')
  async createBuff(@Body() data: MutateBuffDto) {
    const buff = await this.buffService.createBuff(data);
    return ApiResponse.success(buff, 'Buff Created SUccessfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Put('/update/:id')
  async updateBUff(@Param('id') id: string, @Body() data: MutateBuffDto) {
    const buff = await this.buffService.updateBuff(id, data);
    return ApiResponse.success(buff, 'Buff Updated Successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Delete('/delete/:id')
  async deleteBUff(@Param('id') id: string) {
    await this.buffService.deleteBuff(id);
    return ApiResponse.success(null, 'Buff Deleted Successfully');
  }
}
