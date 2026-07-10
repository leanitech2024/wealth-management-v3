'use server';

import { render, toPlainText } from '@react-email/components';
import { Resend } from 'resend';

import ConsultationEmail from '@/emails/consultation-email';
import EducationCalculationEmail from '@/emails/education-calculation-email';
import LumpSumCalculationEmail from '@/emails/lumpsum-calculation-email';
import RetirementCalculationEmail from '@/emails/retirement-calculation-email';
import RiskProfileAnalysisEmail from '@/emails/risk-profile-analysis-email';
import SIPCalculationEmail from '@/emails/sip-calculation-email';
import VacationCalculationEmail from '@/emails/vacation-calculation-email';
import WeddingCalculationEmail from '@/emails/wedding-calculation-email';
import CostOfDelayCalculationEmail from '@/emails/cost-of-delay-calculation-email';
import GoalPlannerCalculationEmail from '@/emails/goal-planner-calculation-email';
import InflationCalculationEmail from '@/emails/inflation-calculation-email';
import SIPStepUpCalculationEmail from '@/emails/sip-step-up-calculation-email';
import SWPCalculationEmail from '@/emails/swp-calculation-email';
import { EmailData } from '@/types/email-data-type';
import {
  ConsultationFormValues,
  EducationCalculatorValues,
  LumpSumCalculatorValues,
  RetirementCalculatorValues,
  RiskProfileFormValues,
  SIPCalculatorValues,
  VacationCalculatorValues,
  WeddingCalculatorValues,
  CostOfDelayCalculatorValues,
  GoalPlannerCalculatorValues,
  InflationCalculatorValues,
  SIPStepUpCalculatorValues,
  SWPCalculatorValues,
} from './zod.schemas';

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(resendApiKey);

type SendEmailProps = {
  type: SessionKey;
  to: string;
  data: EmailData;
};

export async function sendEmail(props: SendEmailProps) {
  try {
    switch (props.type) {
      case 'consultation-form': {
        const html = await render(
          ConsultationEmail({
            ...(props.data as ConsultationFormValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject:
            "Thank You for Reaching Out! Let's Begin Your Wealth Journey 🌟",
          html,
          text,
          react: ConsultationEmail({
            ...(props.data as ConsultationFormValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send consultation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'risk-profile-form': {
        const html = await render(
          RiskProfileAnalysisEmail({
            ...(props.data as RiskProfileFormValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your Personalized Investment Risk Profile is Ready! 📊',
          html,
          text,
          react: RiskProfileAnalysisEmail({
            ...(props.data as RiskProfileFormValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send risk profile analysis email: ${error.message}`,
          );
        }

        return data;
      }

      case 'education-form': {
        const html = await render(
          EducationCalculationEmail({
            ...(props.data as EducationCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject:
            "Secure Your Child's Dream Education - Your Plan is Ready! 🎓",
          html,
          text,
          react: EducationCalculationEmail({
            ...(props.data as EducationCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send education calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'lumpsum-form': {
        const html = await render(
          LumpSumCalculationEmail({
            ...(props.data as LumpSumCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject:
            'Your Lump Sum Investment Analysis - Grow Your Wealth Smartly! 💰',
          html,
          text,
          react: LumpSumCalculationEmail({
            ...(props.data as LumpSumCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send lumpsum calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'sip-form': {
        const html = await render(
          SIPCalculationEmail({
            ...(props.data as SIPCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your SIP Investment Plan - Start Small, Dream Big! 🚀',
          html,
          text,
          react: SIPCalculationEmail({
            ...(props.data as SIPCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send sip calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'retirement-form': {
        const html = await render(
          RetirementCalculationEmail({
            ...(props.data as RetirementCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject:
            "Your Dream Retirement Awaits - Here's Your Personalized Plan! 🏖️",
          html,
          text,
          react: RetirementCalculationEmail({
            ...(props.data as RetirementCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send retirement calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'wedding-form': {
        const html = await render(
          WeddingCalculationEmail({
            ...(props.data as WeddingCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Plan Your Perfect Wedding - Financial Roadmap Ready! 💍',
          html,
          text,
          react: WeddingCalculationEmail({
            ...(props.data as WeddingCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send wedding calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'vacation-form': {
        const html = await render(
          VacationCalculationEmail({
            ...(props.data as VacationCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject:
            "Your Dream Vacation is Within Reach - Let's Make it Happen! ✈️",
          html,
          text,
          react: VacationCalculationEmail({
            ...(props.data as VacationCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send vacation calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'cost-of-delay-form': {
        const html = await render(
          CostOfDelayCalculationEmail({
            ...(props.data as CostOfDelayCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your Cost of Delay Analysis - Start Early, Build Wealth! ⏳',
          html,
          text,
          react: CostOfDelayCalculationEmail({
            ...(props.data as CostOfDelayCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send cost of delay calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'goal-planner-form': {
        const html = await render(
          GoalPlannerCalculationEmail({
            ...(props.data as GoalPlannerCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your Goal-Based Investment Roadmap - Achieve Milestones! 🎯',
          html,
          text,
          react: GoalPlannerCalculationEmail({
            ...(props.data as GoalPlannerCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send goal planner calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'inflation-form': {
        const html = await render(
          InflationCalculationEmail({
            ...(props.data as InflationCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your Inflation Power Erosion Analysis - Protect Wealth! 📈',
          html,
          text,
          react: InflationCalculationEmail({
            ...(props.data as InflationCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send inflation calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'sip-step-up-form': {
        const html = await render(
          SIPStepUpCalculationEmail({
            ...(props.data as SIPStepUpCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your SIP Step-Up Growth Model - Accelerate Wealth! 🚀',
          html,
          text,
          react: SIPStepUpCalculationEmail({
            ...(props.data as SIPStepUpCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send SIP step-up calculation email: ${error.message}`,
          );
        }

        return data;
      }

      case 'swp-form': {
        const html = await render(
          SWPCalculationEmail({
            ...(props.data as SWPCalculatorValues),
          }),
        );
        const text = toPlainText(html);
        const { data, error } = await resend.emails.send({
          from: 'Ascent Wealth <info@ascentwealth.in>',
          to: [props.to],
          subject: 'Your Systematic Withdrawal Cash Flow Roadmap - Secure Income! 💰',
          html,
          text,
          react: SWPCalculationEmail({
            ...(props.data as SWPCalculatorValues),
          }),
        });

        if (error) {
          throw new Error(
            `Failed to send SWP calculation email: ${error.message}`,
          );
        }

        return data;
      }

      default:
        throw new Error('Invalid email type');
    }
  } catch (error) {
    console.log('❌❌❌ Internal Server Error: Failed to send email', error);
    // throw new Error('❌❌❌ Internal Server Error: Failed to send email');
    return null;
  }
}
